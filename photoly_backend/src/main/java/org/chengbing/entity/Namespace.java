package org.chengbing.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author HaroldCI
 * @since 2022-06-24
 */
@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value="Namespace对象", description="")
public class Namespace implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "ns_id", type = IdType.AUTO)
    private Integer nsId;

    private String nsName;

    private Integer nsParentId;

    private Integer userId;


}
